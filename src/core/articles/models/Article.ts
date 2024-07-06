export default class Article {
  public id: number;
  public title: string;
  public content: string;

  constructor({
    id,
    title,
    content,
  }: {
    id: number;
    title: string;
    content: string;
  }) {
    this.id = id;
    this.title = title;
    this.content = content;
  }
}
