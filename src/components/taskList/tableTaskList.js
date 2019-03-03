import React, { Component } from 'react';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

class TableTaskList extends Component {

  state = {
    rowStyle:{"text-align":"left"},
    columnDefs: [
      { headerName: "Make", field: "make" ,headerCheckboxSelection:true , checkboxSelection:true},
      { headerName: "Model", field: "model" },
      { headerName: "Price", field: "price" },
      { headerName: "Done", field: "Done" , cellRenderer:"<input type='checkbox'>"}
    ],
    rowData: [
      { make: "Toyota", model: "Celica", price: 35000 },
      { make: "Ford", model: "Mondeo", price: 32000 },
      { make: "Porsche", model: "Boxter", price: 72000 }
    ]
  }


  render() {
    return (
      <div className="ag-theme-material">
        <AgGridReact suppressCellSelection rowStyle={this.state.rowStyle}  columnDefs={this.state.columnDefs} rowData={this.state.rowData} />
      </div>
      
    )
  }
};

export default TableTaskList;