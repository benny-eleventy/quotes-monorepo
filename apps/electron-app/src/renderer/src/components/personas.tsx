/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CenterAlignedColumnContainer,
  FlexStartRowContainer,
  WrapppedRowContainer
} from '@bennyui/core'
import { useGetAll } from 'hooks'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setApiDetails, usePersonaGlobalState } from 'state'

const Personas = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const apiDetails = {
      baseURL: 'https://antilibrary-uat.deno.dev',
      headers: {
        'Content-Type': 'application/json',
        'X-App-Source': 'QUOTES-WEB-APP'
      }
    }

    dispatch(setApiDetails(apiDetails))
  }, [dispatch])

  useGetAll({
    entity: 'personas'
  })

  const { results } = usePersonaGlobalState()

  return (
    <CenterAlignedColumnContainer background="black" height="100vh" width="100vw">
      <WrapppedRowContainer width="50%" height="auto">
        {results.map((persona: any) => {
          return (
            <FlexStartRowContainer
              color="black"
              width="200px"
              padding="20px"
              margin="10px"
              borderRadius="10px"
              alignItems="center"
              background="lightpink"
              key={persona._id}
            >
              <>{persona.name}</>
            </FlexStartRowContainer>
          )
        })}
      </WrapppedRowContainer>
    </CenterAlignedColumnContainer>
  )
}

export { Personas }
