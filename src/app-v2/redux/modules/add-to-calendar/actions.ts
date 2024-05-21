export class AddToCalendarCommand {
  static type = `[ADD_TO_CALENDAR] add to calendar`;
  static create(startsAt: string, endsAt: string, title: string, description: string, id: string) {
    return {
      type: this.type,
      payload: {
        startsAt,
        endsAt,
        title,
        description,
        id,
      },
    };
  }
}
