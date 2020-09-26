import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dww-h5-study-box',
  templateUrl: './h5-study-box.component.html',
  styleUrls: ['./h5-study-box.component.scss']
})
export class H5StudyBoxComponent implements OnInit {
  htmlContent = `
<div class="outer">
    <div class="inner"></div>
  </div>`;
  codeContent = ``;
  cssContent = `.outer{
  width: 800px;
  height: 100px;
  border: 10px solid red;
}
.inner{
  width: 200px;
  height: 100px;
  background: #dadbdd;
  padding: auto;
}
`;
  constructor() { }

  ngOnInit() {
  }

}
