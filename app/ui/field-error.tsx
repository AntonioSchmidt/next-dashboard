
type Props = {
    errors: string[];
    id: string;
}

export function FieldError({ errors, id }: Props) {
    return (
        <div id={id} aria-live="polite" aria-atomic="true">
            {errors.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                    </p>
                ))}
        </div>
    )
}