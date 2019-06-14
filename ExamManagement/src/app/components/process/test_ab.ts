export default abstract class HH {
  abstract name: string;
  abstract display(string): string;
}

export default interface HH2 {
  hieu: string;
  display2: () => string;
  hau(string): string;
}
