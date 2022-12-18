import Text from '@/components/Text';
import { Link } from './Link';
export type NavigationItem = {
  text: string;
  url: string;
};

export const Item = ({ text, url }: NavigationItem) => {
  return (
    <Link to={url} className="navbar-link">
      <Text variant="link" color="white">
        {text}
      </Text>
    </Link>
  );
};

export const Items = ({ items }: { items: Array<NavigationItem> }) => {
  return (
    <>
      {items.map(item => (
        <Item key={item.text} text={item.text} url={item.url} />
      ))}
    </>
  );
};
