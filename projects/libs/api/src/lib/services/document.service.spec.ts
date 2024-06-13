import { TestBed } from '@angular/core/testing';
import { Firestore, addDoc, deleteDoc, doc, getDoc, getDocs, updateDoc } from '@angular/fire/firestore';
import { DocumentService } from './document.service';

jest.mock('@angular/fire/firestore', () => ({
  Firestore: {},
  collection: jest.fn(),
  serverTimestamp: jest.fn(),
  addDoc: jest.fn(),
  getDoc: jest.fn(),
  deleteDoc: jest.fn(),
  doc: jest.fn(),
  updateDoc: jest.fn(),
  getDocs: jest.fn(),
}));

interface EntityMock {
  description: string;
}

const timestampMock = {
  nanoseconds: 12345,
  seconds: 12345,
};

const documentEntityMock = {
  description: 'description-value',
};

const documentSnapMock = {
  id: 'id-value',
  data: () => ({
    createdAt: timestampMock,
    updatedAt: timestampMock,
    ...documentEntityMock,
  }),
};

const documentMock = {
  id: documentSnapMock.id,
  ...documentSnapMock.data(),
};

describe('DocumentService', () => {
  let service: DocumentService<EntityMock>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: Firestore, useValue: {} }],
    });

    service = TestBed.inject(DocumentService);
  });

  beforeEach(() => {
    (addDoc as jest.Mock).mockImplementation(() => Promise.resolve({ id: documentSnapMock.id }));

    (getDoc as jest.Mock).mockImplementation(() => Promise.resolve(documentSnapMock));

    (getDocs as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        docs: [documentSnapMock, documentSnapMock, documentSnapMock],
      }),
    );

    (doc as jest.Mock).mockImplementation(() => Promise.resolve({ id: documentSnapMock.id }));

    (deleteDoc as jest.Mock).mockImplementation(() => Promise.resolve({}));

    (updateDoc as jest.Mock).mockImplementation(() => Promise.resolve({}));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('add', () => {
    it('should return entity object', (done) => {
      service.add('path-value', documentEntityMock).subscribe((doc) => {
        expect(doc).toEqual({
          id: documentSnapMock.id,
          createdAt: timestampMock,
          updatedAt: timestampMock,
          ...documentEntityMock,
        });

        done();
      });
    });
  });

  describe('update', () => {
    it('should return entity object', (done) => {
      service.update('path-value', documentMock).subscribe((doc) => {
        expect(doc).toEqual({
          id: documentSnapMock.id,
          createdAt: timestampMock,
          updatedAt: timestampMock,
          ...documentEntityMock,
        });

        done();
      });
    });
  });

  describe('delete', () => {
    it('should return object with id property', (done) => {
      service.delete('path-value', documentSnapMock.id).subscribe((doc) => {
        expect(doc).toEqual({
          id: documentSnapMock.id,
        });

        done();
      });
    });
  });

  describe('fetchOne', () => {
    it('should return entity object', (done) => {
      service.fetchOne('path-value', documentSnapMock.id).subscribe((doc) => {
        expect(doc).toEqual({
          id: documentSnapMock.id,
          createdAt: timestampMock,
          updatedAt: timestampMock,
          ...documentEntityMock,
        });

        done();
      });
    });
  });

  describe('fetchCollection', () => {
    it('should return array of entity object', (done) => {
      service.fetchCollection('path-value').subscribe((doc) => {
        expect(doc).toEqual([
          {
            id: documentSnapMock.id,
            createdAt: timestampMock,
            updatedAt: timestampMock,
            ...documentEntityMock,
          },
          {
            id: documentSnapMock.id,
            createdAt: timestampMock,
            updatedAt: timestampMock,
            ...documentEntityMock,
          },
          {
            id: documentSnapMock.id,
            createdAt: timestampMock,
            updatedAt: timestampMock,
            ...documentEntityMock,
          },
        ]);

        done();
      });
    });
  });
});
