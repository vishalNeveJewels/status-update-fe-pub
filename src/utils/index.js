export const getCookie = (name) => {
  const cookieValue = document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`);
  return cookieValue ? decodeURIComponent(cookieValue.pop()) : null;
};

export const setCookie = (name, value, days = 7, path = '/') => {
  const expiresDate = new Date();
  expiresDate.setTime(expiresDate.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${expiresDate.toUTCString()}`;

  document.cookie = `${name}=${encodeURIComponent(value)}; ${expires}; path=${path}`;
};

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const generateUniqueId = () => {
  const timestampPart = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substr(2, 9);
  const uniquePart = (timestampPart + randomPart).substr(0, 13);

  return `id_${uniquePart}`;
};

export const isValidPassword = (password) => {
  // Check length
  if (password.length < 5) {
    return false;
  }

  //Check for special character (required)
  if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
    return false;
  }

  // // Check for lowercase letters
  // if (!/[a-z]/.test(password)) {
  //     return false;
  // }

  // // Check for uppercase letters
  // if (!/[A-Z]/.test(password)) {
  //     return false;
  // }

  // // Check for digits
  // if (!/\d/.test(password)) {
  //     return false;
  // }

  return true;
};

export const validateFormats = (validExtensions, files, errCb) => {
  const filesOutput = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const fileName = file.name;
    const fileExtension = fileName.substring(fileName.lastIndexOf('.'));

    if (validExtensions.includes(fileExtension)) {
      filesOutput.push(file);
    } else {
      errCb?.(`Please upload these typed files ${validExtensions}`);
    }
  }
  return filesOutput.length ? filesOutput : null;
};

export const isFieldsEmty = (arrOfObj) => {
  if (!Array.isArray(arrOfObj)) return null;
  let isEmty = false;
  arrOfObj.forEach((item) => {
    const keys = Object.keys(item);
    keys.forEach((item2) => {
      const value = item[item2];
      if (value === '') {
        isEmty = true;
      }
    });
  });
  return isEmty;
};

export const handleFileDownload = (response) => {
  const contentDisposition = response.headers['content-disposition'];
  const filename = contentDisposition ? contentDisposition.split('filename=')[1]?.replace(/["']/g, '') : 'default-filename';
  const blob = new Blob([response.data], { type: response.headers['content-type'] });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  link.parentNode.removeChild(link);
};
