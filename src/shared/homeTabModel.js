/**
 * Created by qlebour on 18/05/2017.
 */
export class HomeTabModel {
  constructor(){
  }

  getActive(){
    return this.tabs.filter(tab => tab.active)
  }

  setActive(id){
    this.tabs.forEach(t => {t.active = false})
    this.tabs.find(t => t.id == id).active = true
  }
}
