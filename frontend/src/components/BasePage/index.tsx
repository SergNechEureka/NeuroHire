import { type ReactNode } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

interface BasePageProps {
  children: ReactNode;
  title: string;
}

const styles = {
  container: css`
    display: flex;
    flex-direction: column;
    height: 100%;
  `,
  header: css`
    margin-bottom: 24px;
  `,
  title: css`
    font-size: 24px;
    font-weight: 600;
    color: #1a1a1a;
  `,
  content: css`
    flex: 1;
  `,
};

const Container = styled.div(styles.container);
const Header = styled.div(styles.header);
const Title = styled.h1(styles.title);
const Content = styled.div(styles.content);

export const BasePage = ({ children, title }: BasePageProps) => {
  return (
    <Container>
      <Header>
        <Title>{title}</Title>
      </Header>
      <Content>{children}</Content>
    </Container>
  );
};
