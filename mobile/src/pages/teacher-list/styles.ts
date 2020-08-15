import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f1'
  },
  teacherList: {
    marginTop: -40
  },
  searchForm: {
    marginBottom: 24
  },
  label: {
    color: '#D4C2FF',
    fontFamily: 'Poppins_400Regular'
  },
  input: {
    height: 54,
    backgroundColor: '#FFF',
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginTop: 4,
    marginBottom: 16
  },
  inputBlock: {
    width: '48%'
  },
  inputGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonSubmit: {
    backgroundColor: '#04D361',
    height: 56,
    flexDirection: 'row',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonSubmitText: {
    color: '#FFF',
    fontFamily: 'Archivo_700Bold',
    fontSize: 16
  }
})
