const mergeCsvPagesLogic = () => {
  const inputFile = document.getElementById("fileName");
  const inputUpload = document.getElementById("uploadFile");
  const fileName = inputFile.value;
  const uploadFiles = inputUpload.files;
  const errorMessage = document.getElementById("errorMessage");
  let allFine = true;

  if (fileName.length < 1) {
    allFine = false;
    inputFile.style.border = "1px solid red";
  }

  if (uploadFiles.length < 1) {
    allFine = false;
    inputUpload.style.border = "1px solid red";
  }

  if (allFine) {
    mergeCSVFiles(uploadFiles, fileName);
  } else {
    errorMessage.style.display = "block";
  }
};
