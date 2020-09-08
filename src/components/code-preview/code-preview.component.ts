import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'dww-code-preview',
  templateUrl: './code-preview.component.html',
  styleUrls: ['./code-preview.component.scss']
})
export class CodePreviewComponent implements OnInit, OnChanges {

  @Input() previewTitle = '';
  @Input() htmlContent = '';
  @Input() codeContent = '';
  @Input() selectedTab = '';

  // activeTab name should be demo/html/code
  activeTab = 'demo';

  htmlHighlighted = null;
  codeHighlighted = null;

  get showDemoTab(): boolean {
    return this.activeTab === 'demo';
  }

  get showHtmlTab(): boolean {
    return this.activeTab === 'html';
  }

  get showCodeTab(): boolean {
    return this.activeTab === 'code';
  }

  constructor(private sanitizer: DomSanitizer) { }

  ngOnChanges() {
    if (this.htmlContent) {
      this.htmlHighlighted = this.sanitizer.bypassSecurityTrustHtml(hljs.highlight('html', this.htmlContent).value);
    }

    if (this.codeContent) {
      this.codeHighlighted = this.sanitizer.bypassSecurityTrustHtml(hljs.highlight('typescript', this.codeContent).value);
    }

    if (this.selectedTab) {
      this.activeTab = this.selectedTab === 'code' ? 'code' :
        this.selectedTab === 'html' ? 'html' : 'demo';
    }
  }

  selectTab(tab) {
    this.activeTab = tab;
  }

  ngOnInit(): void {
  }

}
