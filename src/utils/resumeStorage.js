import { openDB } from './db';

const STORE_NAME = 'resume';
const RESUME_ID = 'resume_file';

export async function saveResumeFile(file) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const req = tx.objectStore(STORE_NAME).put(
      { blob: file, name: file.name, size: file.size, type: file.type },
      RESUME_ID
    );
    req.onsuccess = () => resolve();
    req.onerror = (e) => reject(e.target.error);
  });
}

export async function getResumeMeta() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const req = tx.objectStore(STORE_NAME).get(RESUME_ID);
    req.onsuccess = (e) => {
      const result = e.target.result;
      resolve(result ? { name: result.name, size: result.size } : null);
    };
    req.onerror = (e) => reject(e.target.error);
  });
}

export async function downloadResume() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const req = tx.objectStore(STORE_NAME).get(RESUME_ID);
    req.onsuccess = (e) => {
      const result = e.target.result;
      if (!result) { resolve(false); return; }
      const url = URL.createObjectURL(result.blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = result.name || 'Mohammed_Shabaz_Amin_Resume.pdf';
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 2000);
      resolve(true);
    };
    req.onerror = (e) => reject(e.target.error);
  });
}

export async function deleteResumeFile() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const req = tx.objectStore(STORE_NAME).delete(RESUME_ID);
    req.onsuccess = () => resolve();
    req.onerror = (e) => reject(e.target.error);
  });
}

export function formatResumeSize(bytes) {
  if (!bytes) return '';
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
