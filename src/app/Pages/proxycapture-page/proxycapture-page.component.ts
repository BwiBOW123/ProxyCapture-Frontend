import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ToolsBarComponent } from '../../Components/tools-bar/tools-bar.component';
import { ButtonComponent } from '../../Components/button/button.component';
import { DisplayFileComponent } from '../../Components/display-file/display-file.component';
import { DisplayDocumentComponent } from '../../Components/display-document/display-document.component';
import { DisplayVoteComponent } from '../../Components/display-vote/display-vote.component';
import { ResizableDirective } from '../../resizable.directive'
import { MesssageBoxComponent } from '../../Components/messsage-box/messsage-box.component';
@Component({
  selector: 'app-proxycapture-page',
  standalone: true,
  imports: [RouterLink,RouterOutlet,ToolsBarComponent,DisplayFileComponent,DisplayDocumentComponent,DisplayVoteComponent,MesssageBoxComponent],
  templateUrl: './proxycapture-page.component.html',
  styleUrl: './proxycapture-page.component.css'
})
export class ProxycapturePageComponent {

}
