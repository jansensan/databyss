import React, { useEffect, useCallback, useRef } from 'react'
import { throttle } from 'lodash'
import ContentEditable from '@databyss-org/editor/components/ContentEditable'
import EditorProvider from '@databyss-org/editor/state/EditorProvider'
import { withMetaData } from '@databyss-org/editor/lib/util'
import { usePageContext } from '@databyss-org/services/pages/PageProvider'
import { useNavigationContext } from '@databyss-org/ui'
import {
  withWhitelist,
  addMetaData,
} from '@databyss-org/services/pages/_helpers'

const PageBody = ({ page }) => {
  const { location } = useNavigationContext()
  const { clearBlockDict, setPatch, setPage } = usePageContext()
  useEffect(() => () => clearBlockDict(), [])

  const operationsQueue = useRef([])
  const pageState = useRef(null)

  const onUnmount = () => {
    setPage({ ...pageState.current, updatePageInCache: true })
  }

  // throttled autosave occurs every SAVE_PAGE_THROTTLE ms when changes are happening
  const throttledAutosave = useCallback(
    throttle(({ nextState, patch }) => {
      const _patch = withWhitelist(patch)
      if (_patch.length) {
        const payload = {
          id: nextState.page._id,
          patch: operationsQueue.current,
        }
        setPatch(payload)
        operationsQueue.current = []
      }
    }, process.env.SAVE_PAGE_THROTTLE),
    []
  )

  // state from provider is out of date
  const onChange = value => {
    pageState.current = value.nextState
    const patch = addMetaData(value)
    // push changes to a queue
    operationsQueue.current = operationsQueue.current.concat(patch)
    throttledAutosave({ ...value, patch })
  }

  return (
    <EditorProvider
      key={location.pathname}
      onChange={onChange}
      initialState={withMetaData(page)}
    >
      <ContentEditable onUnmount={onUnmount} autofocus />
    </EditorProvider>
  )
}

export default PageBody
