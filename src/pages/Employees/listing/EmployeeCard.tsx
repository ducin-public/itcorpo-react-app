import { employeeImageURL } from '../employeeImageURL';
import { H2, H3 } from '../../../components/Typography/Headings';
import { Text } from '../../../components/Typography/Text';
import { Employee } from '../../../contract-types/data-contracts';

type EmployeeCardProps = {
    employee: Pick<Employee, 'name' | 'position' | 'department' | 'imgURL'>;
    size: 'SMALL' | 'LARGE';
}

const EmployeeCardSmall = ({ employee }: Pick<EmployeeCardProps, 'employee'>) => {
    return <div className="flex items-center space-x-6">
        <img
            src={employeeImageURL(employee)}
            alt={`${employee.name}`}
            className="h-16 w-16 rounded-full object-cover"
        />
        <div>
            <H3 className='mb-0'>{employee.name}</H3>
            <Text>{employee.position}</Text>
            <Text size="SMALL" className='block'>{employee.department}</Text>
        </div>
    </div>
}

const EmployeeCardLarge = ({ employee }: Pick<EmployeeCardProps, 'employee'>) => {
    return <div className="flex items-center space-x-6">
        <img
            src={employeeImageURL(employee)}
            alt={`${employee.name}`}
            className="h-24 w-24 rounded-full object-cover"
        />
        <div>
            <H2>{employee.name}</H2>
            <Text>{employee.position}</Text>
            <Text size="SMALL" className='block'>{employee.department}</Text>
        </div>
    </div>
}

export const EmployeeCard = ({ employee, size }: EmployeeCardProps) => {
    switch (size) {
        case 'SMALL':
            return <EmployeeCardSmall employee={employee} />;
        case 'LARGE':
            return <EmployeeCardLarge employee={employee} />;
    }
}
