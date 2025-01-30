import { Text } from "../Typography/Text";

type ValidationErrorProps = {
  children: React.ReactNode;
};

export const ValidationError = ({ children }: ValidationErrorProps) => {
    return <Text size="SMALL" variant="ALERT" className="mt-1">{children}</Text>;
}
