package com.agenda.api.controller.response;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Response<T> {
	
	private T data;
	private List<T> datas;
	private List<String> errors;
	
	public void addErros(String error) {
		if (this.errors == null) {
			this.errors = new ArrayList<String>();
		}
		
		this.errors.add(error);
	} 
	
	public void addDatas(T dados) {
		if (this.datas == null) {
			this.datas = new ArrayList<T>();
		}

		this.datas.add(dados);
	}

}
