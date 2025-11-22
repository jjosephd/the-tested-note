import type { Page, Locator } from '@playwright/test';

export class NotesPage {
  readonly noteTitle: Locator;
  readonly noteBody: Locator;

  readonly saveNoteButton: Locator;
  readonly deleteNoteButton: Locator;
  readonly viewAllNotesButton: Locator;

  readonly noteItem: Locator;
  readonly noteItems: Locator;

  constructor(readonly page: Page) {
    this.page = page;
    this.noteTitle = page.getByTestId('note-title');
    this.noteBody = page.getByTestId('note-content');
    this.noteItem = page.getByTestId('note-item').first();
    this.noteItems = page.getByTestId('note-item');
    this.deleteNoteButton = this.noteItem.getByRole('button', {
      name: /delete note/i,
    });
    this.viewAllNotesButton = page.getByTestId('view-all-notes');
    this.saveNoteButton = page.getByTestId('save-note');
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

  async clickDeleteNote() {
    this.deleteNoteButton.click();
  }

  async clickViewAllNotes() {
    this.viewAllNotesButton.click();
  }

  getNoteItem = (): Locator => {
    return this.noteItem;
  };

  getNoteItems = (): Locator => {
    return this.noteItems;
  };

  getNoteItemByIndex = (index: number): Locator => {
    return this.getNoteItems().nth(index);
  };

  async createNote(title: string, body: string) {
    await this.fillNoteTitle(title);
    await this.fillNoteBody(body);
    await this.clickSaveNote();
  }
}
