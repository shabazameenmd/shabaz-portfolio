import { openDB } from './db';

const STORE = 'project_images';

export async function saveProjectImages(projectId, blobs) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite');
    const images = blobs.slice(0, 5).map(b => ({
      blob: b,
      name: b.name || 'image',
      type: b.type,
      size: b.size,
    }));
    const req = tx.objectStore(STORE).put(images, String(projectId));
    req.onsuccess = () => resolve();
    req.onerror = (e) => reject(e.target.error);
  });
}

export async function getProjectImages(projectId) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readonly');
    const req = tx.objectStore(STORE).get(String(projectId));
    req.onsuccess = (e) => resolve(e.target.result || []);
    req.onerror = (e) => reject(e.target.error);
  });
}

export async function getProjectImageUrls(projectId) {
  const images = await getProjectImages(projectId);
  return images.map(img => URL.createObjectURL(img.blob));
}

export async function deleteProjectImages(projectId) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite');
    const req = tx.objectStore(STORE).delete(String(projectId));
    req.onsuccess = () => resolve();
    req.onerror = (e) => reject(e.target.error);
  });
}
