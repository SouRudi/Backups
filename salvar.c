#include <stdio.h>

//Mostrar data(outra ordem)
int main(){
    
    int dia, mes, ano ;
    
    printf("Informe o ano , mês e dia (nessa ordem): \n");
    scanf("%d ", &ano);
    scanf("%d", &mes);
    scanf("%d", &dia);
    
    if(mes<=12 && dia <= 31){
    printf("A data completa é: %.2d/%.2d/%.4d", dia, mes, ano);
    }else{
    printf("Data inválida");
    }
    return 0;
}
// Mostrar data
/*int main(){
    
    int dia, mes, ano ;
  
    printf("Informe o dia: \n");
    scanf("%d", &dia);
    printf("Informe o mês: \n");
    scanf("%d", &mes);
    printf("Informe o ano: \n");
    scanf("%d", &ano);

    printf("A data completa é: %.2d/%.2d/%.4d", dia, mes, ano);

    return 0;
}
*/
