export const handleInput = function (event) {
  const name = event.target.name;
  const value = event.target.value;

  if (!name) throw new Error("Input must have a name attribute");

  this.setState((state, props) => ({ [name]: value }));
}
