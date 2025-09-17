import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SocketService {
  private socket?: Socket;
  private inited = false;

  init(): void {
    if (this.inited) return;                 // avoid duplicate connects
    this.inited = true;

    this.socket = io('http://localhost:3000', {
      // Uncomment if you see connect_error or polling issues:
      // transports: ['websocket'],
      // reconnection: true,
      // reconnectionAttempts: 5,
      // reconnectionDelay: 1000,
    });

    this.socket.on('connect', () => {
      console.log('[socket] connected:', this.socket?.id);
    });
    this.socket.on('disconnect', (reason) => {
      console.log('[socket] disconnected:', reason);
    });
    this.socket.on('connect_error', (err) => {
      console.error('[socket] connect_error:', err?.message ?? err);
    });
    this.socket.on('error', (err) => {
      console.error('[socket] error:', err);
    });
  }

  send(message: string): void {
    this.socket?.emit('message', message);
  }

  getMessages(): Observable<string> {
    return new Observable<string>((observer) => {
      const handler = (msg: any) => {
        // Normalize to string whether server sends "hello" or { id, text }
        const text = typeof msg === 'string' ? msg : msg?.text ?? '';
        if (text) observer.next(text);
      };
      this.socket?.on('message', handler);

      // Cleanup when unsubscribed
      return () => this.socket?.off('message', handler);
    });
  }
}
