import React, { useEffect, useMemo, useRef, useState } from 'react'
import { TableAlive } from '../../components/TableAlive/TableAlive';
import { authorization } from '../../services/utils/Autorizathion';
import { ModalForm } from '../../components/ModalForm/ModalForm';
import { Routes } from '../../services/utils/Routes';
import { generatedInputs } from '../../components/Form/Form/Form.type';
import { Button } from '../../components/Button/Button';

export function Dashboard() {

  const columns = useMemo(() => [
    {key: 'userId', title: 'userId'},
    {key: 'id', title: 'id'},
    {key: 'title', title: 'Titulo'},
    {key: 'body', title: 'Contenido'},
  ],[])

  const formInputs: generatedInputs[] = ([
    {
      key: 'title',
      placeholder : 'Titulo',
      title: 'prueba',
      name: 'title',
      value: '',
      type: 'text',
      validations: {
        rules: {
          required: true
        }
      }
    },
    {
      key: 'body',
      placeholder : 'Cuerpo',
      title: 'Cuerpo',
      name: 'body',
      value: '',
      type: 'text',
      validations: {
        rules: {
          required: true
        }
      }
    }
  ])

  const [propModalForm, setPropModalForm] = useState<any>({
  formInputs: formInputs,
  urlStore: Routes.POSTS.STORE,
  urlUpdate: Routes.POSTS.UPDATE,
  urlShow: Routes.POSTS.SHOW,
  isEditMode: false,
  visible: false,
  afterUpdate: (data: any) => {
    console.log(data)
  },
  afterStore: (data: any) => {
    console.log(data)
  },
  afterDelete : (data: any) => {
    console.log(data)
  },
  showRequestConfiguration : {
    method: 'GET',
    headers: {
      Authorization: authorization(),
      'Content-type': 'application/json; charset=UTF-8'
    }
  },
  updateRequestConfiguration : {
    method: 'PATCH',
    headers: {
      Authorization: authorization(),
      'Content-type': 'application/json; charset=UTF-8'
    }
  },
  storeRequestConfiguration : {
    method: 'POST',
    headers: {
      Authorization: authorization(),
      'Content-type': 'application/json; charset=UTF-8'
    }
  }
  })

  const onOpenStore = () :void => {
    setPropModalForm((prev : any) => ({
      ...prev,
      ...{
        visible: true,
        isEditMode : false
      }
    }))
  }

  const onOpenUpdate = () :void => {
    setPropModalForm((prev : any) => ({
      ...prev,
      ...{
        urlShow: prev.urlShow + '/1',
        urlUpdate: prev.urlUpdate + '/1',
        visible: true,
        isEditMode : true
      }
    }))
  }

  const onCloseModal = () => {
    setPropModalForm((prev : any) => ({
      ...prev,
      ...{
        urlShow: Routes.POSTS.SHOW,
        visible: false,
        isEditMode : false
      }
    }))
  }

  const onafterUpdate = (data: any) => {
    setPropModalForm((prev : any) => ({
      ...prev,
      ...{
        urlShow: Routes.POSTS.SHOW,
        urlUpdate: Routes.POSTS.UPDATE,
        visible: false,
        isEditMode : false
      }
    }))
  }

  const onafterStore = (data: any) => {
    setPropModalForm((prev : any) => ({
      ...prev,
      ...{
        visible: false,
      }
    }))
  }

  return (
    <div>

      <Button
      onClick={onOpenStore}
      text={'Abrir formulario'}
      />
      <Button
      onClick={onOpenUpdate}
      text={'Editar formulario'}
      />

      <ModalForm
      inputs={propModalForm.formInputs}
      urlStore={propModalForm.urlStore}
      urlUpdate={propModalForm.urlUpdate}
      urlShow={propModalForm.urlShow}
      isEditMode={propModalForm.isEditMode}
      visible={propModalForm.visible}
      resetAfterClose={true}
      showRequestConfiguration={propModalForm.showRequestConfiguration}
      storeRequestConfiguration={propModalForm.storeRequestConfiguration}
      updateRequestConfiguration={propModalForm.updateRequestConfiguration}
      onCloseModal={onCloseModal}
      afterUpdate={onafterUpdate}
      afterStore={onafterStore}
      />

      <TableAlive
      columns={columns}
      urlIndex={'https://jsonplaceholder.typicode.com/posts'}
      requestConfiguration={{
        method: 'GET',
        headers: {
          Authorization: authorization()
        }
      }}
      />
    </div>
  )
}
