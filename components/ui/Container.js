import cn from 'classnames';

const Container = ({ children, className, el = 'div', clean }) => {
  const rootClassName = cn(className, {
    'mx-auto max-w-8xl px-6': !clean,
  });

  let Component = el;

  return <Component className={rootClassName}>{children}</Component>;
};

export default Container;
