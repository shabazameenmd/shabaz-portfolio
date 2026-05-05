const DB_NAME = 'portfolio_db';
const DB_VERSION = 3;

export function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains('videos')) {
        db.createObjectStore('videos');
      }
      if (!db.objectStoreNames.contains('project_images')) {
        db.createObjectStore('project_images');
      }
      if (!db.objectStoreNames.contains('resume')) {
        db.createObjectStore('resume');
      }
    };
    req.onsuccess = (e) => resolve(e.target.result);
    req.onerror = (e) => reject(e.target.error);
  });
}
