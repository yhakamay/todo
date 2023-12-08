type noTodoAlertProps = {
  message: string;
};

export default function NoTodoAlert(props: noTodoAlertProps) {
  const { message } = props;

  return (
    <div className="text-center border border-base-content card bg-base-100">
      <div className="card-body">
        <h2 className="text-xl">{message}</h2>
      </div>
    </div>
  );
}
