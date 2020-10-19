import React,{useState,Fragment} from 'react';
import { Layout, Row, Col, Form , Radio,Button, Input, Space,Select, Image} from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import 'antd/dist/antd.css'
import './Graficador.css'

function Graficador() {  

  const {Content} = Layout;

  const { Option } = Select;

  const [data, setData] = useState(null)

  const resetear = () =>{
     window.location.reload(true);
  }

  const handleSubmit = async (data) =>{
        try {
    const response = await fetch('https://graficador.ml/api/data',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({data,color:'green'})
      })
  
      if (response.ok) {
        const image = await response.blob()
        // setData(new File([image], "result"))
        setData(URL.createObjectURL(image))
      } else {
        const error = await response.text()
        console.log(error)
      }
    } catch (error) {
      console.log(error)
    }


}

  return (
    <Fragment>
    <div className="header">
            <h1 className="titulo">Método Gráfico</h1>
            </div>
    <Layout className="fondo">
        <div className="contenedor">
        <Content>
            <Row className="seccion">
              
              
            </Row>
           
            <Form 
                name="calculos"
                onFinish={handleSubmit}
                >
                
                    <Col xs={24} >
                        <p>Minimizar o Maximizar</p>
                    </Col>
                    <Col xs={24} >
                        <Form.Item name="maxmin" rules={[
                        {
                            required: true,
                            message: "Obligatorio",
                        },
                        ]}>
                            <Radio.Group className="margin__item">
                                <Radio value="maximizar">Maximizar</Radio>
                                <Radio value="minimizar">Minimizar</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                

                <Row className="margen seccion">
                    <Col xs={24}>
                        <p>Función Objetivo</p>
                    </Col>
                    <Col xs={3} md={3}>
                        <p className="margen__item">Z = </p>
                    </Col>
                    <Col xs={5} md={3}>
                        <Form.Item
                            name="xObj"
                            rules={[
                             {
                                required: true,
                                message: 'Obligatorio',
                             },
                            ]}
                        >
                            <Input  className="campo__input"/>
                        </Form.Item>
                    </Col>
                    <Col xs={3} md={2}>
                        <p className="margen_item margen_izquierdo">X</p>
                    </Col>
                    <Col xs={4} md={2}>
                        <p className="margen_item margen_izquierdo"> + </p>
                    </Col>

                    <Col xs={5} md={3}>
                       <Form.Item
                            name="yObj"
                            rules={[
                             {
                                required: true,
                                message: 'Obligatorio',
                             },
                            ]}
                        >
                            <Input  className="campo__input"/>
                        </Form.Item>
                    </Col>
                     <Col xs={3} md={3}>
                        <p className="margen_item margen_izquierdo"> Y </p>
                    </Col>
                    
                </Row>

                <Row className="margen seccion">
                    <Col xs={24}>
                        <p>Restricciones</p>
                        
                    </Col> 

                <Form.List name="names">
                    {(fields, { add, remove }) => {
                    return (
                    <>
                        {fields.map((field) => (
                            <div key={field.key}>
                                <Space className="space">
                               
                        <Form.Item
                          {...field}
                          name={[field.name, "valorX"]}
                          fieldKey={[field.fieldKey, "nombreAccionista"]}
                          rules={[
                            { required: true, message: "Obligatorio" },
                          ]}
                        >
                          <Input className="campo__input" />
                        </Form.Item>

                        <p>X</p>

                        <p>+</p>
                   
                        <Form.Item
                          {...field}
                          name={[field.name, "valorY"]}
                          fieldKey={[field.fieldKey, "numeroAcciones"]}
                          rules={[
                            { required: true, message: "Obligatorio" },
                          ]}
                        >
                          <Input className="campo__input" />
                        </Form.Item>

                        <p>Y</p>

                        <Form.Item
                            name={[field.name,"igualador"]}
                             rules={[
                                {
                                    required: true,
                                    message: 'Obligatorio',
                                },
                                ]}
                            >
                            <Select className="campo__input">
                            <Option value="<=">{'<='}</Option>
                            <Option value="=">{'='}</Option>
                            <Option value=">=">{'>='}</Option>
                            </Select>
                        </Form.Item>
                     
                        <Form.Item
                          {...field}
                          name={[field.name, "resultado"]}
                          fieldKey={[field.fieldKey, "montoCapital"]}
                          rules={[
                            { required: true, message: "Obligatorio" },
                          ]}
                        >
                          <Input className="campo__input" />
                        </Form.Item>

                         
                    </Space>
                  </div>
                ))}

                    <div
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                    
                    <PlusCircleOutlined
                      className="icon"
                      onClick={() => {
                        add();
                      }}
                    />
                    <span
                      className="tope"
                      style={{ marginLeft: "5px" }}
                    >
                      Agregar
                    </span>
                    </div>
              </>
            );
          }}
        </Form.List>
        </Row>
                

                <Row className="margen__item">
                    <div className="contenedor__botones">
                    <Button className="contenedor__botones" htmlType="submit">Resolver</Button>
                    </div>
                </Row>

                
            </Form>

{
  data ? (

            <Row className="seccion">
                <Col xs={24}>
                    <Image src={data}></Image>
                </Col>
            </Row>

  ) : null
}
        </Content>
        </div>
    </Layout>
    </Fragment>
  );
}

export default Graficador;