import { columnConfiguratorLogic } from './columnConfiguratorLogic'
import { expectLogic } from 'kea-test-utils'
import { initKeaTests } from '~/test/init'
import { teamLogic } from 'scenes/teamLogic'

describe('columnConfiguratorLogic', () => {
    let logic: ReturnType<typeof columnConfiguratorLogic.build>

    const startingColumns = ['a', 'b', 'ant', 'aardvark']

    beforeEach(() => {
        initKeaTests()
        logic = columnConfiguratorLogic({ key: 'uniqueKey', columns: startingColumns, setColumns: () => {} })
        logic.mount()
    })

    it('starts with expected defaults', async () => {
        await expectLogic(logic).toMatchValues({
            modalVisible: false,
            columns: startingColumns,
        })
    })

    it('can show modal', async () => {
        await expectLogic(logic, () => logic.actions.showModal()).toMatchValues({
            modalVisible: true,
        })
    })

    it('can hide the modal', async () => {
        await expectLogic(logic, () => logic.actions.hideModal()).toMatchValues({
            modalVisible: false,
        })
    })

    it('sets modal to hidden when user has selected and saved columns', async () => {
        await expectLogic(logic, () => {
            logic.actions.showModal()
            logic.actions.setColumns(['a'])
            logic.actions.save()
        }).toMatchValues({
            modalVisible: false,
        })
    })

    it('cannot duplicate columns', async () => {
        await expectLogic(logic, () => {
            logic.actions.selectColumn('added')
            logic.actions.selectColumn('added')
        }).toMatchValues({
            columns: ['a', 'b', 'ant', 'aardvark', 'added'],
        })
    })

    it('sets toggle to save columns as default', async () => {
        await expectLogic(logic, () => {
            logic.actions.toggleSaveAsDefault()
        }).toMatchValues({
            saveAsDefault: true,
        })
    })

    it('saves columns as default', async () => {
        await expectLogic(logic, () => {
            logic.actions.selectColumn('added')
            logic.actions.toggleSaveAsDefault()
            logic.actions.save()
        }).toDispatchActions([
            teamLogic.actionCreators.updateCurrentTeam({ live_events_columns: ['a', 'b', 'ant', 'aardvark', 'added'] }),
            logic.actionCreators.toggleSaveAsDefault(),
        ])
    })
})
