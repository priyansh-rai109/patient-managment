#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define FILENAME "patients.txt"

typedef struct {
    int id;
    char name[50];
    int age;
    char disease[50];
} Patient;

void addPatient() {
    FILE *file = fopen(FILENAME, "a");
    if (!file) { printf("Error opening file!\n"); return; }

    Patient p;
    printf("Enter Patient ID: "); scanf("%d", &p.id);
    printf("Enter Name: "); scanf("%s", p.name);
    printf("Enter Age: "); scanf("%d", &p.age);
    printf("Enter Disease: "); scanf("%s", p.disease);

    fprintf(file, "%d|%s|%d|%s\n", p.id, p.name, p.age, p.disease);
    fclose(file);

    printf("\n✅ Patient added successfully!\n");
}

void displayPatients() {
    FILE *file = fopen(FILENAME, "r");
    if (!file) { printf("No records found.\n"); return; }

    Patient p;
    printf("\n--- Patient List ---\n");
    printf("ID | Name | Age | Disease\n");
    printf("----------------------------\n");
    while (fscanf(file, "%d|%49[^|]|%d|%49[^\n]\n", &p.id, p.name, &p.age, p.disease) == 4) {
        printf("%d | %s | %d | %s\n", p.id, p.name, p.age, p.disease);
    }
    fclose(file);
}

int main() {
    int choice;
    while (1) {
        printf("\n1. Add Patient\n2. Display Patients\n3. Exit\nEnter choice: ");
        scanf("%d", &choice);
        switch(choice) {
            case 1: addPatient(); break;
            case 2: displayPatients(); break;
            case 3: exit(0);
            default: printf("Invalid choice!\n");
        }
    }
    return 0;
}
