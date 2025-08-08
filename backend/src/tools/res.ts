class Respond {
  send(res: ExpressResponse, responseCode: number, data?: any) {
    return res.status(responseCode).json(data);
  }

  sendBlob(res: ExpressResponse, filePath: string, fileName: string) {
    return res.download(filePath, fileName);
  }

  download(res: ExpressResponse, file: any, fileName: string, fileType: string) {
    const fileContentType = fileType === 'xlsx'
      ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      : fileType;

    res.header('Content-Type', `application/${fileContentType}`);
    res.header(`Content-Disposition', 'attachment; filename=${fileName}.${fileType}`);

    res.write(file, 'binary');
    return res.end(null, 'binary');
  }
}

const res = new Respond();

export default res;