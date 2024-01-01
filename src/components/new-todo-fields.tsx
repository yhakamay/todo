import { MouseEventHandler, RefObject } from "react";

type Props = {
  titleRef: RefObject<HTMLInputElement>;
  frequencyRef: RefObject<HTMLSelectElement>;
  handleClick: MouseEventHandler<HTMLButtonElement>;
};

export default function NewTodoFields(props: Props) {
  const { titleRef, frequencyRef, handleClick } = props;

  return (
    <div className="w-full max-w-4xl join join-vertical sm:join-horizontal">
      <input
        type="text"
        ref={titleRef}
        placeholder="Type new todo"
        autoFocus
        className="input input-bordered w-full join-item"
      />
      <select
        ref={frequencyRef}
        className="select select-bordered join-item"
        defaultValue=""
        title="Frequency"
      >
        <option value="" disabled>
          Frequency
        </option>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
        <option value="once">Once</option>
      </select>
      <button onClick={handleClick} className="btn btn-primary join-item">
        Add
      </button>
    </div>
  );
}
