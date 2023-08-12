import React from "react";
import Excel from 'exceljs';
import { saveAs } from 'file-saver';
export const workSheetName = 'Worksheet-1';
export const workBookName = 'MyWorkBook';
export const myInputId = 'myInput';

export const columns = [
  { header: 'ID', key: 'id' },
  { header: 'First Name', key: 'firstName' },
  { header: 'Last Name', key: 'lastName' },
];

export const data = [
  {
    id: 1,
    firstName: 'Kylie',
    lastName: 'James',
  },
  {
    id:2,
    firstName: 'Harry',
    lastName: 'Peake',
  }
];

const generateExcel = (workbook) => {
  return async () => {
    try {
      const myInput = document.getElementById(myInputId);
      const fileName = myInput.value || workBookName;

      // creating one worksheet in workbook
      const worksheet = workbook.addWorksheet(workSheetName);

      // add worksheet columns
      // each columns contains header and its mapping key from data
      worksheet.columns = columns;

      // updated the font for first row.
      worksheet.getRow(1).font = { bold: true };

      // loop through all of the columns and set the alignment with width.
      worksheet.columns.forEach(column => {
        column.width = column.header.length + 5;
        column.alignment = { horizontal: 'center' };
      });

      // loop through data and add each one to worksheet
      data.forEach(singleData => {
        worksheet.addRow(singleData);
      });

      // loop through all of the rows and set the outline style.
      worksheet.eachRow({ includeEmpty: false }, row => {
        // store each cell to currentCell
        const currentCell = row._cells;

        // loop through currentCell to apply border only for the non-empty cell of excel
        currentCell.forEach(singleCell => {
          // store the cell address i.e. A1, A2, A3, B1, B2, B3, ...
          const cellAddress = singleCell._address;

          // apply border
          worksheet.getCell(cellAddress).border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
          };
        });
      });

      // write the content using writeBuffer
      const buf = await workbook.xlsx.writeBuffer();

      // download the processed file
      saveAs(new Blob([buf]), `${fileName}.xlsx`);
    } catch (error) {
      console.error('<<<ERRROR>>>', error);
      console.error('Something Went Wrong', error.message);
    } finally {
      // removing worksheet's instance to create new one
      workbook.removeWorksheet(workSheetName);
    }
  };
}

const RenderExcel = () => {
    const workbook = new Excel.Workbook();
    const saveExcel = generateExcel(workbook);

    return (
        <div className="card">
            Export to excel from table
            <br />
            Export to : <input id={myInputId} defaultValue={workBookName} /> .xlsx <button onClick={saveExcel}>Export</button>

            <table style={{ margin: '0 auto' }}>
                <thead>
                    <tr>
                        {columns.map(({ header, key }) => {
                            return <th key={key}>{header}</th>;
                        })}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => {
                        return (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default RenderExcel;
