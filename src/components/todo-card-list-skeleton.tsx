import TodoCardSkeleton from "./todo-card-skeleton";

type Props = {
  count: number;
};

export default function TodoCardListSkeleton(props: Props) {
  const { count } = props;
  const uid = crypto.randomUUID();

  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <TodoCardSkeleton key={uid + i} />
      ))}
    </>
  );
}
