import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dww-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  example1 = {
    html: `  <pre>
  <code [highlight]="code"></code>
</pre>`,
    code: `export interface ConfirmOption {
  title: string;                  // 标题
  icon?: string;                  // 图标，为空则不显示
  content: string;                // 文本内容
  confirm: Function;              // 确认回调函数
  cancel?: Function;              // 取消回调函数
  confirmText?: string;           // 确认按钮文字，默认 "确定"
  cancelText?: string;            // 取消按钮文字，默认 "取消"
  cancelButtonTheme?: string;     // 取消按钮样式，和Button一致
  confirmButtonTheme?: string;    // 确认按钮样式
}

export class ViewConfirmComponent{

  constructor(
    private confirmService: ConfirmService
  ) { }

  showConfirm() {
    this.confirmService.show({
      title: 'Confirm Title',
      icon: 'info',
      content: 'Confirm Content',
      confirm: () => {
        alert('confirmed!');
      }
    });
  }

  showConfirm2() {
    this.confirmService.show({
      title: '确认标题',
      content: '确认内容文本',
      cancelButtonTheme: 'hollow-blue',
      cancel: () => {
        alert('canceled!');
      },
      confirm: () => {
        alert('confirmed!');
      }
    });
  }
}`
  };

  constructor() { }

  ngOnInit() {
  }

}
