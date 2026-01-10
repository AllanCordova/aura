/**
 * @jest-environment node
 */

export function createFormData(data: Record<string, any>): FormData {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    formData.append(key, String(value));
  });

  return formData;
}
