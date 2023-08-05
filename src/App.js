import React, { useCallback, useMemo, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import GenderRenderer from './genderRenderer.jsx';
import MoodEditor from './moodEditor.jsx';
import MoodRenderer from './moodRenderer.jsx';
import NumericEditor from './numericEditor.jsx';

class CountryCellRenderer {
  init(params) {
    this.eGui = document.createElement('div');
    this.eGui.innerHTML = `${params.value.name}`;
  }

  getGui() {
    return this.eGui;
  }

  refresh(params) {
    return false;
  }
}



function getData() {
  const cloneObject = (obj) => JSON.parse(JSON.stringify(obj));

  const students = [
    {
      first_name: 'Bob',
      last_name: 'Harrison',
      gender: 'Male',
      address:
        '1197 Thunder Wagon Common, Cataract, RI, 02987-1016, US, (401) 747-0763',
        mood: 1,
    
      country: { name: 'Ireland', code: 'IE' },
    },
    {
      first_name: 'Mary',
      last_name: 'Wilson',
      gender: 'Female',
      age: 11,
      address: '3685 Rocky Glade, Showtucket, NU, X1E-9I0, CA, (867) 371-4215',
      mood: 22,
      country: { name: 'Ireland', code: 'IE' },
    },
    {
      first_name: 'Zahid',
      last_name: 'Khan',
      gender: 'Male',
      age: 12,
      address:
        '3235 High Forest, Glen Campbell, MS, 39035-6845, US, (601) 638-8186',
        mood: 22,
      country: { name: 'Ireland', code: 'IE' },
    },
    {
      first_name: 'Jerry',
      last_name: 'Mane',
      gender: 'Male',
      age: 12,
      address:
        '2234 Sleepy Pony Mall , Drain, DC, 20078-4243, US, (202) 948-3634',
        mood: 22,
      country: { name: 'Ireland', code: 'IE' },
    },
  ];

  // double the array twice, make more data!
  students.forEach((item) => {
    students.push(cloneObject(item));
  });
  students.forEach((item) => {
    students.push(cloneObject(item));
  });
  students.forEach((item) => {
    students.push(cloneObject(item));
  });

  return students;
}

const cellCellEditorParams = (params) => {
 console.log(params.api);
 console.log(params.cols);
 const selectedCountry = params.data;
 console.log(selectedCountry);

 return{
  isOpenselect : true
 }
  
};



function App() {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100vh' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState(getData());
  const [columnDefs, setColumnDefs] = useState([
    {
      field: 'first_name',
      headerName: 'First Name',
      width: 120,
      editable: true,
    },
    { field: 'last_name', headerName: 'Last Name', width: 120, editable: true },
    {
      field: 'gender',
      width: 100,
      editable: true,
      cellRenderer: GenderRenderer,
      cellEditor: 'agRichSelectCellEditor',
      cellEditorPopup: true,
      cellEditorParams: {
        cellRenderer: GenderRenderer,
        values: ['Male', 'Female'],
      },
    },
    {
      field: 'age',
      width: 80,
      editable: true,
      cellEditor: NumericEditor,
    },
    {
      field: 'mood',
      width: 70,
      
      //cellRenderer: MoodRenderer,
      cellEditor: MoodEditor,
      editable: true,
      singleClickEdit :true,
      height: 96,
      cellEditorParams: cellCellEditorParams,
    },
    {
      field: 'country',
      width: 110,
      cellEditor: 'agRichSelectCellEditor',
      cellEditorPopup: true,
      cellRenderer: CountryCellRenderer,
      keyCreator: (params) => {
        return params.value.name;
      },
      cellEditorParams: {
        cellRenderer: CountryCellRenderer,
        values: [
          { name: 'Ireland', code: 'IE' },
          { name: 'UK', code: 'UK' },
          { name: 'France', code: 'FR' },
        ],
      },
      editable: true,
      cellDataType: false,
    },
    {
      field: 'address',
      editable: true,
      cellEditor: 'agLargeTextCellEditor',
      cellEditorPopup: true,
      cellEditorParams: {
        maxLength: '300',
        cols: '50',
        rows: '6',
      },
    },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      editable: true,
      sortable: true,
      flex: 1,
      minWidth: 100,
      filter: true,
      resizable: true,
    };
  }, []);

  const onRowEditingStarted = useCallback((event) => {
    console.log('never called - not doing row editing');
  }, []);

  const onRowEditingStopped = useCallback((event) => {
    console.log('never called - not doing row editing');
  }, []);

  const onCellEditingStarted = useCallback((event) => {
    console.log('cellEditingStarted');
  }, []);

  const onCellEditingStopped = useCallback((event) => {
    console.log('cellEditingStopped');
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
        rowHeight={96}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onRowEditingStarted={onRowEditingStarted}
          onRowEditingStopped={onRowEditingStopped}
          onCellEditingStarted={onCellEditingStarted}
          onCellEditingStopped={onCellEditingStopped}
        />
      </div>
    </div>
  );
}

export default App;
