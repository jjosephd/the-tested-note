import { test, expect } from '@playwright/test';
import type { Page, Locator } from '@playwright/test';

export class CreateNotePage {
  readonly noteTitle: Locator;
  readonly noteBody: Locator;
  readonly saveNoteButton: Locator;
  readonly noteItem: Locator;

  constructor(readonly page: Page) {
    this.page = page;
    this.noteTitle = page.getByTestId('note-title');
    this.noteBody = page.getByTestId('note-content');
    this.saveNoteButton = page.getByTestId('save-note');
    this.noteItem = page.getByTestId('note-item').first();
  }

  async fillNoteTitle(title: string) {
    await this.noteTitle.fill(title);
  }

  async fillNoteBody(body: string) {
    await this.noteBody.fill(body);
  }

  async clickSaveNote() {
    this.saveNoteButton.click();
  }

  async handleFillNote(title: string, body: string) {
    await this.fillNoteTitle(title);
    await this.fillNoteBody(body);
    await this.clickSaveNote();
  }
}
