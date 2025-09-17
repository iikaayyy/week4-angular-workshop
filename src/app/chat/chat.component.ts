import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  messageContent = '';
  messages: string[] = [];
  private unsub?: () => void;

  constructor(private socketSvc: SocketService) {}

  ngOnInit(): void {
    console.log('[chat] init');
    this.socketSvc.init();
    const sub = this.socketSvc.getMessages().subscribe(m => {
      console.log('[chat] message:', m);
      this.messages.push(m);
    });
    this.unsub = () => sub.unsubscribe();
  }

  ngOnDestroy(): void {
    this.unsub?.();
  }

  send(): void {
    const text = this.messageContent.trim();
    if (!text) return;
    this.socketSvc.send(text);
    this.messageContent = '';
  }
}
