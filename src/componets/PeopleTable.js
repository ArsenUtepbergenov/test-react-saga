import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { LOAD_USERS } from '../store/reducers/people/actions'
import { selectPeople } from '../store/reducers/people/selectors'
import PeopleTablePagination from './PeopleTablePagination'

export default function PeopleTable () {
  const people = useSelector(selectPeople)
  const dispatch = useDispatch()

  const changePage = newPage => dispatch({
    type: LOAD_USERS,
    payload: {
      page: newPage,
      search: people.search
    }
  })

  const search = event => dispatch({
    type: LOAD_USERS,
    payload: {
      page: 1,
      search: event.target.value
    }
  })

  return (
    <>
      <h1>
        Star Wars People
        <form>
          <input
            style={{ padding: '10px 12px' }}
            type="text"
            value={people.search}
            placeholder="Search people..."
            onChange={search}
          />
        </form>
      </h1>
      {
        people.loading ? (
          <div>
            Loading...
          </div>
        ) : (
          <>
            <table border={1} width="100%" cellPadding={2} cellSpacing={0}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Birth year</th>
                  <th>Eye color</th>
                  <th>Gender</th>
                  <th>Hair color</th>
                  <th>Height</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {
                  people?.data?.results.map(character => {
                    const id = character.url.replaceAll(/\D/g, '')

                    return (
                      <tr key={character.name}>
                        <td>{character.name}</td>
                        <td>{character.birtd_year}</td>
                        <td>{character.eye_color}</td>
                        <td>{character.gender}</td>
                        <td>{character.hair_color}</td>
                        <td>{character.height}</td>
                        <td>
                          <Link to={`/people/${id}`}>
                            Details
                          </Link>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
            <PeopleTablePagination
              page={people.page}
              total={people.data.count}
              onChange={changePage}
            />
          </>
        )
      }
    </>
  )
}