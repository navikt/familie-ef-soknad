interface ShowProps {
  if?: any;
  children?: any;
}

const Show = (props: ShowProps) => (props.if ? props.children : null);

export default Show;
