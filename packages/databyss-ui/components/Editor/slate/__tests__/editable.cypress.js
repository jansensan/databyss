/** @jsx h */

/* eslint-disable func-names */

import h from 'slate-hyperscript'
import { toSlateJson, matchExpectedJson } from './_helpers'
// import {  } from './../hotKeys'

context('Editor', () => {
  beforeEach(() => {
    cy.visit('http://0.0.0.0:6006/iframe.html?id=editor-tests--slate')
    cy.get('[contenteditable="true"]')
      .as('editor')
      .focus()
    cy.get('#slateDocument').as('slateDocument')
  })

  it('renders the contenteditable container', () => {
    cy.get('@editor').should('have.attr', 'role')
  })

  it('should set initial blocks and inlines', () => {
    const expected = toSlateJson(
      <value>
        <document>
          <block type="SOURCE">
            <text />
            <inline type="SOURCE">
              Stamenov, Language Structure, Discourse and the Access to
              Consciousness
            </inline>
            <text />
          </block>
          <block type="ENTRY">
            On the limitation of third-order thought to assertion
          </block>
          <block type="TOPIC">
            <text />
            <inline type="TOPIC">topic</inline>
            <text />
          </block>
        </document>
      </value>
    )

    cy.get('@slateDocument').then(matchExpectedJson(expected.document))
  })

  it('should set @ block to SOURCE on blur', () => {
    cy.get('@editor')
      .nextBlock()
      .nextBlock()
      .endOfLine()
      .type('{backspace}@this is a source')
      .newLine()

    const expected = toSlateJson(
      <value>
        <document>
          <block type="SOURCE">
            <text />
            <inline type="SOURCE">
              Stamenov, Language Structure, Discourse and the Access to
              Consciousness
            </inline>
            <text />
          </block>
          <block type="ENTRY">
            On the limitation of third-order thought to assertion
          </block>
          <block type="SOURCE">
            <text />
            <inline type="SOURCE">this is a source</inline>
            <text />
          </block>
          <block type="ENTRY" />
        </document>
      </value>
    )
    cy.get('@slateDocument').then(matchExpectedJson(expected.document))
  })

  it('Should not allow content/range change on atomic blocks', () => {
    cy.get('@editor')
      .nextBlock()
      .nextBlock()
      .type('{command}b')
      .type('this should not be allowed')
      .type('{uparrow}')

    const expected = toSlateJson(
      <value>
        <document>
          <block type="SOURCE">
            <text />
            <inline type="SOURCE">
              Stamenov, Language Structure, Discourse and the Access to
              Consciousness
            </inline>
            <text />
          </block>
          <block type="ENTRY">
            On the limitation of third-order thought to assertion
          </block>
          <block type="TOPIC">
            <text />
            <inline type="TOPIC">topic</inline>
            <text />
          </block>
        </document>
      </value>
    )
    cy.get('@slateDocument').then(matchExpectedJson(expected.document))
  })

  it('should escape html on block type change and allow bold', () => {
    cy.get('@editor')
      .endOfDoc()
      .type('{backspace}')
      .type('@this is ')
      .toggleBold()
      .type('bold and not ')
      .toggleBold()
      .type('<i>italic</i>')
      .newLine()

    const expected = toSlateJson(
      <value>
        <document>
          <block type="SOURCE">
            <text />
            <inline type="SOURCE">
              Stamenov, Language Structure, Discourse and the Access to
              Consciousness
            </inline>
            <text />
          </block>
          <block type="ENTRY">
            On the limitation of third-order thought to assertion
          </block>
          <block type="SOURCE">
            <text />
            <inline type="SOURCE">
              <mark type="bold">
                {
                  'this is <strong>bold and not </strong>&lt;i&gt;italic&lt;/i&gt;'
                }
              </mark>
            </inline>
            <text />
          </block>
          <block type="ENTRY" />
        </document>
      </value>
    )
    cy.get('@slateDocument').then(matchExpectedJson(expected.document))
  })

  it('should escape html on block type change and allow italic', () => {
    cy.get('@editor')
      .endOfDoc()
      .type('{backspace}')
      .type('@this is ')
      .toggleItalic()
      .type('italic and not ')
      .toggleItalic()
      .type('<strong>bold</strong>')
      .newLine()

    const expected = toSlateJson(
      <value>
        <document>
          <block type="SOURCE">
            <text />
            <inline type="SOURCE">
              Stamenov, Language Structure, Discourse and the Access to
              Consciousness
            </inline>
            <text />
          </block>
          <block type="ENTRY">
            On the limitation of third-order thought to assertion
          </block>
          <block type="SOURCE">
            <text />
            <inline type="SOURCE">
              <mark type="italic">
                {
                  'this is <em>italic and not </em>&lt;strong&gt;bold&lt;/strong&gt;'
                }
              </mark>
            </inline>
            <text />
          </block>
          <block type="ENTRY" />
        </document>
      </value>
    )
    cy.get('@slateDocument').then(matchExpectedJson(expected.document))
  })

  it('should toggle a location mark and tag block as location, then split up block into two location blocks', () => {
    cy.get('@editor')
      .endOfDoc()
      .type('{backspace}')
      .toggleLocation()
      .type('this whole block should get tagged as a location')
      .newLine()
      .type('{uparrow}')
      .type('{rightarrow}')
      .type('{rightarrow}')
      .type('{rightarrow}')
      .type('{rightarrow}')
      .type('{rightarrow}')
      .newLine()

    const expected = toSlateJson(
      <value>
        <document>
          <block type="SOURCE">
            <text />
            <inline type="SOURCE">
              Stamenov, Language Structure, Discourse and the Access to
              Consciousness
            </inline>
            <text />
          </block>
          <block type="ENTRY">
            On the limitation of third-order thought to assertion
          </block>
          <block type="LOCATION">
            <mark type="location">this </mark>
          </block>
          <block type="LOCATION">
            <mark type="location">
              whole block should get tagged as a location
            </mark>
          </block>
          <block type="ENTRY" />
        </document>
      </value>
    )
    cy.get('@slateDocument').then(matchExpectedJson(expected.document))
  })

  it('should toggle inline location mark', () => {
    cy.get('@editor')
      .endOfDoc()
      .type('{backspace}')
      .type('this block has an ')
      .toggleLocation()
      .type('inline location')
      .toggleLocation()
      .type(' within an entry')
      .newLine()
      .type('{uparrow}')
      .type('{uparrow}')

    const expected = toSlateJson(
      <value>
        <document>
          <block type="SOURCE">
            <text />
            <inline type="SOURCE">
              Stamenov, Language Structure, Discourse and the Access to
              Consciousness
            </inline>
            <text />
          </block>
          <block type="ENTRY">
            On the limitation of third-order thought to assertion
          </block>
          <block type="ENTRY">
            <text>this block has an </text>
            <mark type="location">inline location</mark>
            <text> within an entry</text>
          </block>
          <block type="ENTRY" />
        </document>
      </value>
    )
    cy.get('@slateDocument').then(matchExpectedJson(expected.document))
  })

  it('should toggle LOCATION type then go back to ENTRY when location toggle is entered within the entry', () => {
    cy.get('@editor')
      .endOfDoc()
      .type('{backspace}')
      .toggleLocation()
      .type('this whole block should get tagged as an ')
      .toggleLocation()
      .type('entry')
      .newLine()
      .type('{uparrow}')
      .type('{uparrow}')

    const expected = toSlateJson(
      <value>
        <document>
          <block type="SOURCE">
            <text />
            <inline type="SOURCE">
              Stamenov, Language Structure, Discourse and the Access to
              Consciousness
            </inline>
            <text />
          </block>
          <block type="ENTRY">
            On the limitation of third-order thought to assertion
          </block>
          <block type="ENTRY">
            <text>
              <mark type="location">
                this whole block should get tagged as an{' '}
              </mark>
            </text>
            entry
            <text />
          </block>
          <block type="ENTRY" />
        </document>
      </value>
    )
    cy.get('@slateDocument').then(matchExpectedJson(expected.document))
  })
})