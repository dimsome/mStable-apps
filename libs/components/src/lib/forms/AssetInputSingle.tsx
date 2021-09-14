import React, { FC } from 'react'
import styled from 'styled-components'
import { AssetInput } from './AssetInput'
import { SubscribedToken } from '@apps/types'
import { BigDecimal } from '@apps/bigdecimal'
import { ReactComponent as SwitchIcon } from '../icons/switch-icon.svg'
import { UnstyledButton } from '../core'
import { useToggle } from 'react-use'

interface Props {
  className?: string
  isFetching?: boolean
  formValue?: string
  handleSetAmount?(formValue?: string): void
  handleSetMax?(amount?: string): void
  spender?: string
  token?: SubscribedToken
  stakedBalance?: BigDecimal
}

const SwitchButton = styled(UnstyledButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 1.25rem;
  margin-left: 0.5rem;
  background: ${({ theme }) => theme.color.background[0]};
  border-radius: 0.25rem;

  > * {
    width: 1rem;
    height: 1rem;

    rect,
    path {
      stroke: ${({ theme }) => theme.color.bodyAccent};
    }
  }
`

const Input = styled(AssetInput)`
  background: ${({ theme }) => theme.color.background[0]};
  height: 3.5rem;
  padding: 0.25rem 0.25rem 0.25rem 0;

  input {
    padding-left: 0.75rem;
  }

  button {
    max-height: 3.5rem;
  }
`

const Balance = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;

  > *:first-child {
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.color.bodyAccent};

    span {
      background: ${({ theme }) => theme.color.background[0]};
      border-radius: 0.25rem;
      padding: 0 0.25rem;
      font-size: 0.75rem;
      margin-left: 0.5rem;
    }
  }

  > *:last-child {
    ${({ theme }) => theme.mixins.numeric};
  }
`

const Container = styled.div`
  background: ${({ theme }) => theme.color.background[3]};
  border-radius: 0.75rem;
`

export const AssetInputSingle: FC<Props> = ({ isFetching, formValue, token, handleSetMax, handleSetAmount, spender, stakedBalance }) => {
  const [walletSelected, toggleSelection] = useToggle(!stakedBalance)

  return (
    <Container>
      <Input
        isFetching={isFetching}
        address={token?.address}
        formValue={formValue}
        handleSetMax={() => handleSetMax?.(walletSelected ? token?.balance?.string : stakedBalance?.string)}
        handleSetAmount={handleSetAmount}
        spender={walletSelected ? spender : undefined}
        hideToken
      />
      <Balance>
        <div>
          {walletSelected ? 'Wallet' : 'Staked'} <span>{token?.symbol}</span>
          {/* {!!stakedBalance && (
            <SwitchButton onClick={toggleSelection}>
              <SwitchIcon />
            </SwitchButton>
          )} */}
        </div>
        <div>{(walletSelected ? token?.balance : stakedBalance)?.toFixed(4)}</div>
      </Balance>
    </Container>
  )
}
