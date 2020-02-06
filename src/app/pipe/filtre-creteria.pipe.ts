import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "creteria"
})
export class FiltreCreteriaPipe implements PipeTransform {
  /* ...args: any[] */
  lists: any = [];
  transform(value: any[], searchJson: any) {
    //console.log("searchJson", searchJson);

    if (searchJson.eyesColor.length === 0) {
      return value;
    }
    Array.prototype["equals"] = function(array) {
      if (!array) {
        return false;
      }
      for (let i = 0, l = this.length; i < l; i++) {
        if (array.includes(this[i])) {
          return true;
        }
      }
      return false;
    };

    return value.filter(it => {
      let eyesColor;
      if (searchJson.eyesColor.length !== 0) {
        eyesColor = searchJson.eyesColor.includes(it.eyesColor);
      } else {
        eyesColor = true;
      }
      //console.log(eyesColor);

      return eyesColor;
    });
  }
}
