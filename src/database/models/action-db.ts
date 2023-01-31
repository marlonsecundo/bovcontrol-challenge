enum ActionType {
  "update",
  "create",
  "delete",
}

interface IActionDBProps {
  type: ActionType;
  payload: any;
}

class ActionDB implements IActionDBProps {
  type: ActionType;
  payload: any;

  constructor(props: IActionDBProps) {
    this.type = props.type;
    this.payload = props.payload;
  }
}
