class DropDownHolder {
    static dropDown;
  
    static setDropDown(dropDown) {
      this.dropDown = dropDown;
    }
  
    static getDropDown() {
      return this.dropDown;
    }
  }
  
  export default DropDownHolder;
  