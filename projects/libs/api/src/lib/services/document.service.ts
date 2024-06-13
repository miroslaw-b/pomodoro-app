import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable, from, map, mergeMap, of } from 'rxjs';
import { DocumentEntity } from '../types/document-entity.type';

@Injectable({
  providedIn: 'root',
})
export class DocumentService<TInputEntity, TEntity extends DocumentEntity = TInputEntity & DocumentEntity> {
  private readonly db = inject(Firestore);

  add(path: string, data: Omit<TEntity, keyof DocumentEntity>): Observable<TEntity> {
    const collectionRef = collection(this.db, path);
    const addDocResult = addDoc(collectionRef, {
      ...data,
      createAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return from(addDocResult).pipe(mergeMap((docRef) => this.fetchOne(path, docRef.id)));
  }

  delete(path: string, id: string): Observable<{ id: string }> {
    const documentRef = doc(this.db, path, id);
    const deleteDocResult = deleteDoc(documentRef);

    return from(deleteDocResult).pipe(map(() => ({ id })));
  }

  update(path: string, data: TEntity): Observable<TEntity> {
    const { id, createdAt, ...dataDoc } = data;
    const documentRef = doc(this.db, path, id);
    const updateDocResult = updateDoc(documentRef, {
      ...dataDoc,
      createdAt,
      updatedAt: serverTimestamp(),
    });

    return of(updateDocResult).pipe(mergeMap(() => this.fetchOne(path, documentRef.id)));
  }

  fetchOne(path: string, id: string): Observable<TEntity> {
    const documentRef = doc(this.db, path, id);
    const getDocResult = getDoc(documentRef);

    return from(getDocResult).pipe(map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }) as TEntity));
  }

  fetchCollection(path: string): Observable<TEntity[]> {
    const collectionRef = collection(this.db, path);
    const getDocsResult = getDocs(collectionRef);

    return from(getDocsResult).pipe(
      map((querySnap) =>
        querySnap.docs.map((queryDocSnap) => ({ id: queryDocSnap.id, ...queryDocSnap.data() }) as TEntity),
      ),
    );
  }
}
