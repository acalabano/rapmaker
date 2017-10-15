'use strict'
import React from 'react'
import { Route, IndexRedirect, IndexRoute, Link } from 'react-router'
import { connect } from 'react-redux'
import {createGame, removeGame} from '../reducers/game'
import {getRhymes, getRhymesData} from '../reducers/words'
// import {getSyllables} from '../reducers/syllables'
import reducer from '../reducers'
import syllable from 'syllable'

class Lobby extends React.Component {
  constructor(props) {
    super(props)
    this.state= {
      didUserAddNewLobby: false,
      currentUserId: '',
      currentUsername: "Anonymous User's",
      dividedLines: [],
      suggestedWords: [],
      prevSyllables: 0,
      numSyllables: 0
    }

    this.onLobbySubmit=this.onLobbySubmit.bind(this)
    this.removeGameCallback=this.removeGameCallback.bind(this)
    this.onInputChange=this.onInputChange.bind(this)
  }

  onLobbySubmit(event) {
    event.preventDefault()
    this.props.createAGame(this.props.games.size+1, event.target.name.value)
  }

  removeGameCallback(event) {
    const removeAGame = this.props.removeAGame
    event.stopPropagation()
    removeAGame(event.target.id)
  }

  onInputChange(event) {
    const getTheRhymes=this.props.getTheRhymes
    let arrayOfWords= event.target.value.split(' ')
    let lastLine= event.target.value.split('\n')
    let lastWord= arrayOfWords[arrayOfWords.length-1]
    console.log(arrayOfWords[arrayOfWords.length-1])
    console.log('lastLine', lastLine[lastLine.length-1])
    if (lastLine.length>1) this.setState({prevSyllables: syllable(lastLine[lastLine.length-2])})
    this.setState({dividedLines: lastLine})
    this.setState({numSyllables: syllable(lastLine[lastLine.length-1])})
    getTheRhymes(lastWord)
  }

  render() {
    return (
      <div className='lobby-background'>
        <div className="form-group">
          <label htmlFor="text">Insert word here:</label>
          <textarea className="form-control" type="text" id="text" onChange={this.onInputChange} cols="30" rows="10"></textarea>
        </div>
        <h1>Number of syllables so on the currentline:</h1>
        <p>{this.state.numSyllables}</p>
        <h1>Syllables on the previous line</h1>
        <p>{this.state.prevSyllables}</p>
        <h1>Your lines so far</h1>
        {
          this.state.dividedLines.map((line) => (
            <div>
              {line + ' (' + syllable(line) + ')'}
            </div>
          ))
        }
        <h1>Suggested Words: </h1>
        <div>
        {
          [...this.props.words].map((el) =>
              <li>{el.word}</li>
          )
        }
      </div>
      </div>
    )
  }
}

const mapStateToProps = ({words}) => ({
  words: words.words
})
const mapDispatchToProps = dispatch => ({
  createAGame: (id, name) => {
    dispatch(createGame(id, name))
  },
  removeAGame: (id) => {
    dispatch(removeGame(id))
  },
  getTheRhymes: (word) => {
    dispatch(getRhymes(word))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Lobby)
