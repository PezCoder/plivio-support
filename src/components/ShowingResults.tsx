export const ShowingResults = ({ count, label }: { count: number, label: string }) => <p className="text-sm text-gray-500 mb-4">Showing {count} {count === 1 ? label : label + 's'}</p>;
