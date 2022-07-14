import { FC } from 'react';
import { Dimmer, Loader as SemanticLoader } from 'semantic-ui-react';

interface Props {
  inverted?: boolean;
  content?: string;
}

const Loader: FC<Props> = ({ content = 'Loading...', inverted = true }) => {
  return (
    <Dimmer active={true} inverted={inverted}>
      <SemanticLoader content={content} />
    </Dimmer>
  );
};

export default Loader;
