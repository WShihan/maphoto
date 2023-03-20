export class Notify {
  static noteDiv;
  static createEle({ msg, color, delay }) {
    this.noteDiv = document.createElement("div");
    this.noteDiv.id = "notification";
    this.noteDiv.style = `display:flex;flex-direction:row;justify-content:center;align-iten:center; position:fixed;top:5vh;px;width:100vw;`;
    let textSpan = document.createElement("span");
    textSpan.style = `display:block;max-width:70vw;padding:.3vw 5vw;color:#fff;font-size:.3rem;border-radius:.1rem;background:${color}`;
    textSpan.innerText = msg;
    setTimeout(() => {
      document.body.removeChild(document.getElementById("notification"));
    }, delay | 3000);
    this.noteDiv.append(textSpan);
    document.body.append(this.noteDiv);
  }
  static success(msg) {
    this.createEle({ msg: msg, color: "rgba(99, 238, 115, 0.512)" });
  }
  static warning(msg) {
    this.createEle({ msg: msg, color: "rgba(220, 95, 78, 0.512)", delay: 1000 });
  }
  static fail(msg) {
    this.createEle({ msg: msg, color: "rgba(128, 128, 128, 0.559)" });
  }
}
